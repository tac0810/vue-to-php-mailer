import FormElement from "@/form/utils/FormElement";
import Validator from "@/form/utils/Validator";

export default [
    new FormElement( {
        label : 'SELECT_1',
        key : 'select_1',
        type : 'select',
        require : true,
        options : {
            data : [
                {
                    label : 'DEFAULT',
                    value : null
                },
                {
                    label : 'OPTION_1',
                    value : 'OPTION_1'
                },
                {
                    label : 'OPTION_2',
                    value : 'OPTION_2'
                },
                {
                    label : 'OPTION_3',
                    value : 'OPTION_3'
                }
            ]
        }
    } ),
    new FormElement( {
        label : 'NAME',
        key : 'name',
        placeholder : 'PLEASE PUT YOUR NAME',
        type : 'text',
        require : true,
    } ),
    new FormElement( {
        label : 'RADIO_1',
        key : 'radio_1',
        type : 'radio',
        require : true,
        options : {
            data : [
                {
                    label : 'A',
                    value : 'A'
                },
                {
                    label : 'B',
                    value : 'B'
                },
                {
                    label : 'C',
                    value : 'C'
                }
            ]
        }
    } ),
    new FormElement( {
        label : 'MAIL',
        key : 'mail',
        placeholder : 'PUT YOUR E-MAIL ADDRESS',
        type : 'email',
        validation : Validator.PAT_EMAIL,
        require : true,
    } ),
    new FormElement( {
        label : 'PHONE NUMBER',
        key : 'tel',
        placeholder : 'PUT YOUR PHONE NUMBER',
        type : 'tel',
        validation : Validator.PAT_PHONENUMBER,
        require : true,
    } ),
    new FormElement( {
        label : 'TEXTAREA',
        key : 'content',
        placeholder : 'WRITE HERE ANYTHING',
        type : 'textarea',
        require : true,
        options : {
            rows : 10,
            cols : 80
        }
    } ),
]