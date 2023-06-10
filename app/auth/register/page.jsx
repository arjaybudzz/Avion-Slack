'use client';

import Image from 'next/image'
import styles from './page.module.css'
import slackIcon from '@/public/slack-icon.png'
import Link from 'next/link'
import ErrorMessage from '@/components/ErrorMessage';
import {useCreateUser} from "../../dataService";
import { useState } from "react";

export default function Registration() {

    const { error, isError, isSuccess, isLoading, mutate } = useCreateUser();

    const [values, setValues] = useState({
      email: "",
      password: "",
      password_confirmation: "",
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
      mutate(values);
    }
  
    if (isLoading) return <h1>Registering User...</h1>;
  

    return (
        <div className={styles.registrationContainer}>
        <header className={styles.signInHeader}>
            <div className={styles.leftColumn}></div>
                <div className={styles.centerColumn}>
                    <Image src= {slackIcon} width={32} height={32} alt='slack-icon'/>
                    <h1 className={styles.slackText}>slack</h1>
                </div>
                <div className={styles.rightColumn}>
            </div>
        </header>
        {isSuccess ? <div>User is now Registered!</div> : null}
        {isError
          ? (
            <ErrorMessage
              errors={error.response.data.errors.full_messages}
            />
          )
          : null}
        <h1 className={styles.registerToSlack}>Register to Slack</h1>
        <form className={styles.formcont} onSubmit={handleSubmit}>
                
                    <input 
                        type="text" 
                        className={styles.emailInput} 
                        placeholder="Enter email..." 
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        />
                    <input 
                        type="password" 
                        className={styles.passwordInput} 
                        placeholder="Enter password..."
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        />
                    <input 
                        type="password" 
                        className={styles.passwordInput} 
                        placeholder="Confirm password..."
                        value={values.password_confirmation}
                        onChange={handleChange}
                        id="password_confirmation"
                        />
                    <div className={styles.registerButtonContainer}>
                        
                            <button className={styles.registerButton} type="submit" >
                                    Sign Up
                            </button>
                       
                    </div>
            </form>
            <p>OR</p>
            <div className={styles.registerButtonContainer}>
                <Link href="/auth/login">
                    <button className={styles.registerButton}>Login</button>
                </Link>
            </div>

    </div>

  )
}
