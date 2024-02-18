"use client";

import SubmitBtn from "@/components/shared/SubmitBtn";
import { model } from "@/model/event/createEventModel";
import { allEvents, createEvents } from "@/services/events/eventsServices";
import React, { forwardRef, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { Form, SelectPicker, InputNumber } from "rsuite";

const Field = forwardRef((props: any, ref: any) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      classPrefix="w-full"
      controlId={`${name}-10`}
      ref={ref}
      className={error ? "has-error" : ""}
    >
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        className="w-full"
        classPrefix="w-full"
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

type CreateEventFormValue = {
  title: string;
  sort: string;
  parent_id?: any | null;
};

function CreateEvent() {
  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: createEvents });
  const {
    data: eventData,
    error: eventerror,
    isLoading: eventLoading,
  } = useQuery({ queryFn: allEvents });

  const formRef = useRef<any>();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState<CreateEventFormValue>({
    title: "",
    sort: "",
    parent_id: null,
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const res = await mutateAsync(formValue);
        if (res?.status == 201) {
          toast.success(res?.data?.message);
          setFormValue({
            title: "",
            sort: "",
            parent_id: null,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}
    >
      <div className="grid xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 text-lg">
        <Field name="title" label="عنوان مناسبت" />
        <Field name="sort" accepter={InputNumber} label="چیدمان مناسبت" />
        <Field
          label="نوع مناسبت"
          name="parent_id"
          accepter={SelectPicker}
          data={eventData?.data?.events
            .filter((item) => {
              return item.parent_id == null;
            })
            .map((item) => {
              return { label: item.title, value: item._id };
            })}
          loading={eventLoading}
        />
      </div>
      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره مناسبت" />
      </Form.Group>
    </Form>
  );
}

export default CreateEvent;
