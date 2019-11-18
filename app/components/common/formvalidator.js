import validator from 'validator';
class FormValidator {
  constructor(validations) {
    // validations is an array of rules specific to a form
    this.validations = validations;
  }
  validate(state) {
    // start out assuming valid
    let validation = this.valid();
    // for each validation rule
    this.validations.forEach(rule => {
      let field = rule.aliasField || rule.field;
      // if the field isn't already marked invalid by an earlier rule
      if (!rule.disabled && !validation[field].isInvalid) { 
        // determine the field value, the method to invoke and
        // optional args from the rule definition
        const field_value = (state[field] || '').toString();
        const args = rule.args || [];
        const validation_method = typeof rule.method === 'string' ?
                                validator[rule.method] :
                                rule.method
        // call the validation_method with the current field value
        // as the first argument, any additional arguments, and the
        // whole state as a final argument.  If the result doesn't
        // match the rule.validWhen property, then modify the
        // validation object for the field and set the isValid
        // field to false
        if(validation_method(field_value, ...args, state, validation,field) != rule.validWhen) {
          validation[field] = { 
            isInvalid: true, 
            message: rule.message 
          }
          validation.isValid = false;
        }
      }
    });
    return validation;
  }
  enableDisableRules(fields,disabled){
    this.validations.forEach(rule => {
        rule.disabled = fields.includes(rule.field)?disabled:!!rule.disabled;
    });
  }
  // create a validation object for a valid form
  valid() {
    const validation = {}
    
    this.validations.map(rule => (
        validation[rule.aliasField || rule.field] = { isInvalid: false, message: '' }
    ));
    return { isValid: true, ...validation };
  }
}
export default FormValidator;