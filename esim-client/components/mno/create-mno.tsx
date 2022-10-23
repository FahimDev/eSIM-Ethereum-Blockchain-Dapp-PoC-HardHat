import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/RegisterMNO.module.css";

const CreateMNOComponent: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex flex-row flex-wrap justify-center">
          <div className="basis-3/6">
            <form className="shadow-xl border-double border-4 border-cyan-600 rounded-lg border-x-cyan-100">
              <div className="p-8">
                <h1 className="capitalize hover:uppercase text-2xl">Register</h1>
                <p className="indent-4">
                  Please fill in this form to Register a Mobile Network
                  Operator.
                </p>
                <hr />
                <label>
                  <b>Email</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  required
                />
                <hr />
                <p>
                  By creating an account you agree to our{" "}
                  <a className="no-underline hover:underline decoration-4 decoration-lime-800" href="#">Terms & Privacy</a>.
                </p>
                <div className="flex items-center justify-center p-4">
                  <span className="relative inline-flex">
                    <button
                      type="button"
                      className={`${styles.registerbtn} inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20`}
                    >
                      Get Register
                    </button>
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </span>
                </div>

                <div className={styles.signin}>
                  <p>
                    Already have an account? <a className="no-underline hover:underline decoration-4 decoration-sky-500" href="#">Sign in</a>.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default CreateMNOComponent;
