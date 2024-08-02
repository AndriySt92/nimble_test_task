import React from "react"
import Button from "./Button"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { IContactFormData } from "../interfaces/contactInterfaces"
import { Error } from "../components"
import LoadingButton from "./LoadingButton"
import { useAddContactMutation } from "../redux/contactApi"

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<IContactFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  const [addContact, { isLoading }] = useAddContactMutation()

  const nameValidation = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) {
      setError("firstName", {
        type: "manual",
        message: "Either First Name or Last Name must be filled.",
      })
      setError("lastName", {
        type: "manual",
        message: "Either First Name or Last Name must be filled.",
      })

      return false
    }

    return true
  }

  const onSubmit = handleSubmit(async data => {
    const isNameValid = nameValidation(data.firstName, data.lastName)

    if (!isNameValid) return

    try {
      await addContact({
        fields: {
          "first name": [{ value: data.firstName, modifier: "", label: "first name" }],
          "last name": [{ value: data.lastName, modifier: "", label: "last name" }],
          email: [{ value: data.email, modifier: "", label: "email" }],
        },
        record_type: "person",
        privacy: { edit: null, read: null },
        owner_id: null,
      }).unwrap()

      reset()
      toast.success("Contact created successfully")
    } catch (error: any) {
      const message = error.data.message || "Something went wrong"
      toast.error(message)
    }
  })

  return (
    <div className="static md:sticky top-4 h-fit mb-[30px] md:mb-5">
      <h1 className="text-2xl font-semibold mb-5 text-start">Create contact</h1>
      <form className=" w-full max-w-lg mx-auto" onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.firstName && "border-red-500"}`}
            placeholder="Enter your First Name"
            {...register("firstName", {
              minLength: {
                value: 2,
                message: "First Name must be at least 2 characters",
              },
              maxLength: {
                value: 70,
                message: "First Name cannot exceed 70 characters.",
              },
            })}
          />
          {errors.firstName && (
            <Error
              className="text-start"
              text={errors.firstName.message as string}
            />
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.lastName && "border-red-500"}`}
            placeholder="Enter your Larst Name"
            {...register("lastName", {
              minLength: {
                value: 2,
                message: "Last Name must be at least 2 characters",
              },
              maxLength: {
                value: 70,
                message: "Last Name cannot exceed 70 characters.",
              },
            })}
          />
          {errors.lastName && (
            <Error
              className="text-start"
              text={errors.lastName.message as string}
            />
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email && "border-red-500"}`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address.",
              },
            })}
          />
          {errors.email && (
            <Error
              className="text-start"
              text={errors.email.message as string}
            />
          )}
        </div>

        {!isLoading ? (
          <Button disabled={isLoading}>Add contact</Button>
        ) : (
          <LoadingButton>Loading...</LoadingButton>
        )}
      </form>
    </div>
  )
}

export default ContactForm
