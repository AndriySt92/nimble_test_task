import React from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useGetContactQuery, useAddTagsMutation } from "../redux/contactApi"
import { Button, Error, Loader, UserInfo } from "../components"
import LoadingButton from "../components/LoadingButton"
import { ICreateTagsRequestData } from "../interfaces/contactInterfaces"
import Tags from "../components/Tags"

const ContactDetails = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data: contact,
    error,
    isLoading: isFetching,
  } = useGetContactQuery(id!)
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
    const tags = data.tags.split(",").map(tag => tag.trim())

    const requestBody: ICreateTagsRequestData = {
      id: contact?.id as string,
      body: {
        tags: Array.from(
          new Set([...contact!.tags.map(tag => tag.tag), ...tags]),
        ),
      },
    }

    try {
      await addTags(requestBody).unwrap()
      reset()
      toast.success("Tags added successfully")
    } catch (error: any) {
      const message = error.data.message || "Something went wrong"
      toast.error(message)
    }
  })

  if (isFetching) {
    return <Loader />
  }

  if (error) {
    return <Error className={"text-2xl text-center"} text={error as string} />
  }

  if (!contact) {
    return null
  }

  return (
    <div className="flex flex-col gap-10 mx-auto max-w-lg">
      <UserInfo
        avatar={contact.avatar_url}
        firstName={contact.fields?.["first name"]?.[0]?.value}
        lastName={contact.fields?.["last name"]?.[0]?.value}
        email={contact.fields?.email?.[0]?.value}
      />

      {contact?.tags.length > 0 && <Tags tags={contact.tags} />}

      <form className=" w-full max-w-lg mx-auto" onSubmit={onSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="tags"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.tags && "border-red-500"}`}
            placeholder="Enter tags"
            {...register("tags", {
              required: "Tags is required.",
              minLength: {
                value: 2,
                message: "Tags must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Tags cannot exceed 100 characters.",
              },
            })}
          />
          {errors.tags && (
            <Error
              className="text-start"
              text={errors.tags.message as string}
            />
          )}
        </div>
        {isLoading ? (
          <Button>Add tags</Button>
        ) : (
          <LoadingButton>Loading...</LoadingButton>
        )}
      </form>
    </div>
  )
}

export default ContactDetails
