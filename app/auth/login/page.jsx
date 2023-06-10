"use client"
import styles from './page.module.css'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useLoginUser} from "../../dataService";
import Image from 'next/image';
import slackIcon from '@/public/slack-icon.png'
import googleIcon from '@/public/google.png'
import appleLogo from '@/public/apple-logo.png'
import ErrorMessage from "@/components/ErrorMessage";

export default function Login() {
  const { isLoading, isError, mutate, error, isSuccess } = useLoginUser();
  const route = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { value, id } = e.target;
    setValues((values) => ({
      ...values,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate(values, {
      onSuccess: () => {
        return route.push("dashboard");
      },
    });
  }
  if (isLoading) return <h1>Logging in User...</h1>;

  return (
    <main>
      <div className={styles.signInContainer}>
        <header className={styles.signInHeader}>
            <div className={styles.leftColumn}></div>
            <div className={styles.centerColumn}>
              <Image src={slackIcon} width={32} height={32} alt='slack-icon'/>
              <h1 className={styles.slackText}>slack</h1>
            </div>
            <div className={styles.rightColumn}>
              <span>New To Slack?</span>
                      <Link href="auth/register" className={styles.registrationLink}>
                          <span>Create an account</span>
                      </Link>
            </div>
        </header>
        <div className={styles.signIn}>
          <h1 className={styles.signInToSlack}>
            Sign in to Slack
          </h1>
          {isError ? <ErrorMessage errors={error.response} /> : null}
          {isSuccess ? <div>User is now Logged In!</div> : null}
          <span className={styles.suggestSpan}>We suggest using the <strong>email address you use at work.</strong>
          </span>

          <div className={styles.buttonsContainer}>
              <div>
                  <button className={styles.googleSignInButton}>
                  <Image src={googleIcon} width={18} height={18} alt='google icon'/>
                  <span className={styles.signInWithGoogle}>Sign In With Google</span>
                  </button>
              </div>
                  <div>
                    <button className={styles.appleSignInButton}>
                    <Image src={appleLogo} width={18} height={18} alt='apple icon'/>
                    <span className={styles.signInWithApple}>Sign In With Apple</span>
                    </button>
                  </div>
          </div>
          <div className={styles.orContainer}>
                  <hr className={styles.leftHorizontalLine}/>
                  <div className={styles.or}>OR</div>
                  <hr className={styles.rightHorizontalLine}/>
          </div>
          <div className='email-input-container'>
                    <form className={styles.emailForm} onSubmit={handleSubmit}>
                        <input 
                          className={styles.emailInput} 
                          type='text' 
                          id="email"
                          placeholder='name@work-email.com'
                          value={values.email} 
                          onChange={(handleChange)}
                          />
                        <span className={styles.errorMessage}></span>
                        <input 
                          className={styles.passwordInput} 
                          type='password' 
                          id="password"
                          placeholder='Enter Password'
                          value={values.password}
                          onChange={handleChange}
                          />
                        <span className={styles.errorMessage}></span>
                        <button type='submit' className={styles.emailSubmitButton}>Log In</button>
                    </form>
                </div>
        </div>
      </div>
    </main>
  )
}
