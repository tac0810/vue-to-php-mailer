<template>
	<div :class="`custom-input custom-input-${formElement.type}`">
		<label v-if="'select' === formElement.type" :for="`custom-input-${formElement.key}`">
			<select
				:name="formElement.key"
				:id="`custom-input-${formElement.key}`"
				:value="value.value"
				:class="`${(null === value.value || '' === value.value) ? 'is-default' : null}`"
				@change="updateValue">
				<option v-for="(option, index) in formElement.getOptions()" :value="option.value" :disabled="null===option.value" :key="`{_uid}-option-${index}`">
					{{ option.label }}
				</option>
			</select>
		</label>
		<label v-else-if="'textarea' === formElement.type" :for="`custom-input-${formElement.key}`">
			<textarea
				:id="`custom-input-${formElement.key}`"
				:cols="formElement.getCols()"
				:rows="formElement.getRows()"
				:placeholder="formElement.placeholder"
				:value="value.value"
				wrap="hard"
				@blur="updateValue"
				@input="updateValue"></textarea>
		</label>
		<span v-else-if="'radio' === formElement.type">
			<label v-for="(radio, index) in formElement.getRadios()" :key="`{_uid}-radio-${index}`" :for="`{_uid}-radio-${index}`" >
				<input
					:id="`{_uid}-radio-${index}`"
					:type="formElement.type"
					:name="formElement.key"
					@change="updateValue"
					:value="radio.value">
				<span class="radio-wrap">
					<span class="radio-ui"></span>
					<span class="radio-label">{{ radio.label }}</span>
				</span>

			</label>

		</span>

		<label v-else :for="`custom-input-${formElement.key}`">
			<input
				:id="`custom-input-${formElement.key}`"
				:type="formElement.type"
				@blur="updateValue"
				@input="updateValue"
				:value="value.value"
				:placeholder="formElement.placeholder">

		</label>

		<p v-if="'' !== errorMsg" class="form-error-msg">{{ errorMsg }}</p>

	</div>

</template>

<script>
    import FormElement from '../utils/FormElement';
    import Validator from '../utils/Validator';

    export default {
        name : "CustomInput",
        props : {
            value : {
                default : ''
            },
            formElement : {
                type : FormElement,
                require : true,
            }
        },
        created() {
            this.formValue.label = this.formElement.label;
        },
        methods : {
            checkTheValue( value ) {
                let isValid = null !== this.formElement.validation ? Validator.pattern( value, this.formElement.validation ) : true,
                    isEmpty = this.formElement.require ? Validator.isEmpty( value ) : true;

                this.formValue.value = value;
                this.formValue.key = this.formElement.key;
                this.formValue.isValid = isValid && isEmpty;

                if ( !isEmpty ) {
                    this.errorMsg = this.formElement.errorMsg[ 0 ];
                } else if ( !isValid ) {
                    this.errorMsg = this.formElement.errorMsg[ 1 ];
                } else {
                    this.errorMsg = '';
                }
            },
            updateValue( e ) {
                this.checkTheValue( e.target.value );

                this.$emit( 'blur', this.formValue );
                this.$emit( 'input', this.formValue );
                this.$emit( 'change', this.formValue );
            }
        },
        data() {
            return {
                errorMsg : '',
                formValue : {
                    label : '',
                    value : '',
                    key : '',
                    isValid : false
                }
            }
        }
    }
</script>

<style scoped>

</style>