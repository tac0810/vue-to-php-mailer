<template>
	<div id="vue-form">
		<transition name="fade">
			<form v-if="'input' === mode" :key="'input'" id="form-input" @submit.prevent="confirm">
				<table class="table-group white">

					<tr class="table-list" v-for="(form, index) in formList" :key="`${mode}-${form.key}`">
						<th>{{ form.label }} <span class="form-require-label" v-if="form.require">※</span></th>
						<td>
							<CustomInput :formElement="form" v-model="formValues[index]" ref="CustomInput"></CustomInput>
						</td>
					</tr>
				</table>

				<button type="submit" class="btn btn-more r-fonts white rect has-border">
					<span>SUBMIT - NEXT STEP</span>
				</button>
			</form>

			<form v-if="'confirm' === mode" :key="'confirm'" id="form-confirm" @submit.prevent="send">
				<table class="table-group white">
					<tr class="table-list" v-for="formValue in formValues" :key="formValue.key">
						<th>{{ formValue.label }}</th>
						<td>
							<pre>{{ formValue.value }}</pre>
						</td>
					</tr>
				</table>

				<button type="submit" class="btn btn-more r-fonts white rect has-border has-arrow">
					<span>SUBMIT - NEXT STEP</span>
				</button>

				<button type="button" @click="back" class="btn btn-more r-fonts white rect has-border back">
					<span>BACK</span>
				</button>

			</form>

			<div v-if="'complete' === mode" :key="'complete'" id="form-complete">
				<div class="block-body">
					<p>THANK YOU FOR YOUR MESSAGE</p>
				</div>
				<footer class="block-foot">
					<a href="/"><span>BACK</span></a>
				</footer>
			</div>
		</transition>
	</div>
</template>

<script>
    import axios from 'axios';
    import CustomInput from 'js/vue/form/components/CustomInput.vue';
    import config from 'js/vue/form/config';


    export default {
        name : "Form",
        created() {
            this.formList = config;
            this.formList.forEach( ( list, index ) => {
                this.formValues[ index ] = {
                    label : list.label,
                    value : '',
                    key : list.key,
                    isValid : !list.require && null === list.validation
                };
            } );
        },
        methods : {
            confirm() {
                this.validAll = true;

                this.$refs[ 'CustomInput' ].forEach( ( CustomInput, index ) => {
                    CustomInput.checkTheValue( this.formValues[ index ].value );

                    if ( !this.formValues[ index ].isValid ) {
                        this.validAll = false;
                    }
                } );

                if ( this.validAll ) {
                    this.mode = 'confirm';
                }
            },
            back() {
                this.mode = 'input';
            },
            send() {
                this.mode = 'complete';

                let mailAddress = '';

                // search mail address
                this.formValues.some( formValue => {
                    if ( 'mail' === formValue.key ) {
                        mailAddress = formValue.value;
                        return true;
                    }
                } );

                let params = new URLSearchParams();
                params.append( 'csrf_token', document.getElementById( 'csrf-token' ).value );
                params.append( 'mail', mailAddress );
                params.append( 'body', JSON.stringify( this.formValues ) );

                axios.defaults.headers[ 'X-CSRF-TOKEN' ] = document.getElementById( 'csrf-token' ).value;
                axios( {
                    method : 'post',
                    url : '/api/mail.php',
                    headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data : params
                } ).then( response => {
                    // console.log( response )
                } ).catch( error => {
                    console.log( error )
                } );
            }
        },
        data() {
            return {
                formList : [],
                formValues : [],
                validAll : true,
                mode : 'input'
            }
        },
        components : {
            CustomInput
        }
    }
</script>

<style scoped>

</style>