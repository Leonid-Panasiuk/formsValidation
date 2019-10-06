import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'
import { from } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  isLoginPage = true;

  user = {
    email: '',
    password: '',
    remember: ''
  }

  checkPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.cpassword.value;

    return pass === confirmPass ? null : { notSame: true }
  };

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
  }
  
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)),
    remember : new FormControl ('', Validators.pattern('true'))
  });

  regForm = new FormGroup({
    username: new FormControl('',Validators.minLength(3) ),
    emailReg: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(5)),
    regFullName: new FormControl('', Validators.required),
    cpassword: new FormControl('', [Validators.required]),
  }, { validators: this.checkPasswords  });

}