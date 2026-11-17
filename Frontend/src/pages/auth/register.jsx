import { useState } from "react";
import {
  LuUser,
  LuMail,
  LuLock,
  LuEye,
  LuEyeOff,
  LuUserPlus,
} from "react-icons/lu";
import { NavLink, replace } from "react-router-dom";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

export function Register() {
  const [values, setValues] = useState(initialValues);
  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (values.password !== values.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:8080/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      localStorage.setItem("access_token", JSON.stringify(data.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data.refresh_token));
      // const text = await response.status();
      // console.log(text);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Account created successfully!");
      setValues(initialValues);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      icon: LuUser,
      autoComplete: "username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      icon: LuMail,
      autoComplete: "email",
    },
  ];

  const passwordFields = [
    {
      name: "password",
      label: "Password",
      show: showPassword,
      toggle: () => setShowPassword((prev) => !prev),
      autoComplete: "new-password",
    },
    {
      name: "confirm_password",
      label: "Confirm password",
      show: showConfirmPassword,
      toggle: () => setShowConfirmPassword((prev) => !prev),
      autoComplete: "new-password",
    },
  ];

  const inputClass =
    "w-full bg-transparent border-b-2 border-white/30 py-2 text-black outline-none focus:border-white/80 transition-colors";

  const labelClass = (name) =>
    `absolute left-0 pointer-events-none transition-all duration-200 ${
      focused === name || values[name]
        ? "-translate-y-5 text-xs text-brand-400/60"
        : "translate-y-0 text-sm text-brand-400"
    }`;

  return (
    <div className="flex justify-center items-center w-screen h-screen mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-90 rounded-xl bg-white/10 shadow-xl backdrop-blur-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 py-6">
          <div className="grid size-12 place-items-center rounded-xl bg-brand text-white shadow-brand">
            <LuUserPlus size={24} />
          </div>

          <h1 className="text-brand text-2xl font-bold">Create account</h1>

          <span className="text-sm text-brand-300">
            Register to get started
          </span>
        </div>

        <div className="flex flex-col gap-6 px-6 pb-6">
          {/* Username and Email */}
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <div key={field.name} className="flex items-center gap-3">
                <Icon className="shrink-0 text-brand" size={20} />

                <div className="relative w-full pt-2">
                  <label
                    htmlFor={field.name}
                    className={labelClass(field.name)}
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={values[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused("")}
                    autoComplete={field.autoComplete}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            );
          })}

          {/* Password fields */}
          {passwordFields.map((field) => (
            <div key={field.name} className="flex items-center gap-3">
              <LuLock className="shrink-0 text-brand" size={20} />

              <div className="relative w-full pt-2">
                <label htmlFor={field.name} className={labelClass(field.name)}>
                  {field.label}
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type={field.show ? "text" : "password"}
                  value={values[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused("")}
                  autoComplete={field.autoComplete}
                  required
                  className={`${inputClass} pr-8`}
                />

                <button
                  type="button"
                  onClick={field.toggle}
                  className="absolute right-0 top-3 text-white/60 hover:text-white"
                  aria-label={field.show ? "Hide password" : "Show password"}
                >
                  {field.show ? (
                    <LuEyeOff className="text-black" />
                  ) : (
                    <LuEye className="text-black" />
                  )}
                </button>
              </div>
            </div>
          ))}
          <span className="text-center ">
            {" "}
            already have an account?
            <NavLink to={"/auth/login"}>click</NavLink>
          </span>

          {/* Messages */}
          {error && (
            <p role="alert" className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-400 text-center">
              {success}
            </p>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg  ring-2 bg-brand/10 cursor-pointer py-2 text-lg font-bold text-brand-500 font-brungee transition-all hover:bg-brand-400/20 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
