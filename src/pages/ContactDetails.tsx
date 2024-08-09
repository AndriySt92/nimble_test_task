import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useGetContactQuery, useAddTagsMutation } from "../redux/contactApi"
import {
  Avatar,
  Button,
  Error,
  LabeledInput,
  Loader,
  UserInfo,
  Tags,
  LoadingButton,
} from "../components"
import type { IApiError, ICreateTagsRequestData } from "../interfaces/contactInterfaces"

const ContactDetails = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Error text="Contact ID is missing." />;
  }
  
  const {
    data: contact,
    error,
    isLoading: isFetching,
  } = useGetContactQuery(id)
  const [addTags, isLoading] = useAddTagsMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ tags: string }>({
    mode: "onChange",
    defaultValues: {
      tags: "",
    },
  })

  const onSubmit = handleSubmit(async data => {
    //devide tags by commas and spaces
    const tags = data.tags
      .replace(/,/g, " ") // replaces all commas in the string with spaces.
      .split(/\s+/) // splits the string by one or more whitespace characters.
      .filter(tag => tag !== '') // filter out empty strings
      .map(tag => tag.trim())

    const requestData: ICreateTagsRequestData = {
      id: contact?.id ?? '',
      body: {
        tags: Array.from(
          new Set([...contact?.tags.map(tag => tag.tag) ?? [], ...tags]),
        ),
      },
    }

    try {
      await addTags(requestData).unwrap()
      reset()
      toast.success("Tags added successfully")
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

  if (isFetching) {
    return <Loader />
  }

  if (error) {
    return (
      <Error
        className={"text-2xl text-center"}
        text="Occured some error with fetching contact by id"
      />
    )
  }

  return (
    <div className="flex flex-col gap-10 mx-auto max-w-lg">
      {contact && (
        <>
          <div className="flex items-center gap-3">
            <Avatar
              src={contact.avatar_url}
              alt={contact.fields?.["first name"]?.[0]?.value}
              variant="large"
            />
            <UserInfo
              firstName={contact.fields?.["first name"]?.[0]?.value}
              lastName={contact.fields?.["last name"]?.[0]?.value}
              email={contact.fields?.email?.[0]?.value}
            />
          </div>

          {contact?.tags.length > 0 && <Tags tags={contact.tags} withTitle />}

          <form className=" w-full max-w-lg mx-auto" onSubmit={onSubmit}>
            <LabeledInput
              name="tags"
              placeholder="Enter tags"
              labelClassName="hidden"
              error={errors?.tags?.message as string}
              register={register}
              validation={{
                required: "Tags is required.",
                minLength: {
                  value: 2,
                  message: "Tags must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Tags cannot exceed 100 characters.",
                },
              }}
            />

            {isLoading ? (
              <Button type="submit">Add tags</Button>
            ) : (
              <LoadingButton>Loading...</LoadingButton>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export default ContactDetails
