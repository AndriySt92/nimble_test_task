import Button from "./Button"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import type {
  IApiError,
  IContactFormData,
  IFields,
} from "../interfaces/contactInterfaces"
import { LoadingButton, LabeledInput, Title } from "../components"
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

    const fields: IFields = { email: [{ value: data.email, modifier: "", label: "email" }],} ;

    if (data.firstName) {
      fields["first name"] = [{ value: data.firstName, modifier: "", label: "first name" }];
    }
  
    if (data.lastName) {
      fields["last name"] = [{ value: data.lastName, modifier: "", label: "last name" }];
    }

    try {
      await addContact({
        fields,
        record_type: "person",
        privacy: { edit: null, read: null },
        owner_id: null,
      }).unwrap();

      reset()
      toast.success("Contact created successfully")
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message =
          (error as IApiError)?.data?.message || "Something went wrong"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  })

  return (
    <div className="static md:sticky top-4 h-fit mb-[30px] md:mb-5">
      <Title>Create contact</Title>
      <form className=" w-full max-w-lg mx-auto" onSubmit={onSubmit}>
        <LabeledInput
          name="firstName"
          placeholder="Enter your First Name"
          label="First Name"
          type="text"
          error={errors?.firstName?.message as string}
          register={register}
          validation={{
            minLength: {
              value: 2,
              message: "First Name must be at least 2 characters",
            },
            maxLength: {
              value: 70,
              message: "First Name cannot exceed 70 characters.",
            },
          }}
        />

        <LabeledInput
          name="lastName"
          placeholder="Enter your Last Name"
          label="Last Name"
          type="text"
          error={errors?.lastName?.message as string}
          register={register}
          validation={{
            minLength: {
              value: 2,
              message: "Last Name must be at least 2 characters",
            },
            maxLength: {
              value: 70,
              message: "Last Name cannot exceed 70 characters.",
            },
          }}
        />

        <LabeledInput
          name="email"
          placeholder="Enter your email"
          label="Your email"
          type="email"
          error={errors?.email?.message as string}
          register={register}
          validation={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address.",
            },
          }}
        />

        {!isLoading ? (
          <Button disabled={isLoading} type="submit">
            Add contact
          </Button>
        ) : (
          <LoadingButton>Loading...</LoadingButton>
        )}
      </form>
    </div>
  )
}

export default ContactForm
