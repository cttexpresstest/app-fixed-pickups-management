import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStore, type Pickup } from '@store/index';
import { dayOptions } from '@lib/dayOptions';

const schema = Yup.object({
  day: Yup.string().required('Requerido'),
  time: Yup.string().required('Requerido'),
  address: Yup.string().required('Requerido')
});

export const PickupForm: React.FC<{
  clientId: string;
  pickup?: Pickup;
  onDone: () => void;
}> = ({ clientId, pickup, onDone }) => {
  const addPickup = useStore((s) => s.addPickup);
  const updatePickup = useStore((s) => s.updatePickup);

  return (
    <Formik
      initialValues={{ day: pickup?.day ?? 'monday', time: pickup?.time ?? '09:00', address: pickup?.address ?? '' }}
      validationSchema={schema}
      onSubmit={(values) => {
        if (pickup) {
          updatePickup(pickup.id, { ...values });
        } else {
          addPickup({ clientId, ...values });
        }
        onDone();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <label className="block">
            <span className="text-sm">Día</span>
            <Field as="select" name="day" className="mt-1 w-full rounded border px-3 py-2">
              {dayOptions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </Field>
            <ErrorMessage component="div" name="day" className="text-sm text-red-600" />
          </label>

          <label className="block">
            <span className="text-sm">Hora</span>
            <Field name="time" type="time" className="mt-1 w-full rounded border px-3 py-2" />
            <ErrorMessage component="div" name="time" className="text-sm text-red-600" />
          </label>

          <label className="block">
            <span className="text-sm">Dirección</span>
            <Field name="address" className="mt-1 w-full rounded border px-3 py-2" />
            <ErrorMessage component="div" name="address" className="text-sm text-red-600" />
          </label>

          <div className="flex justify-end gap-2">
            <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 text-white px-3 py-2">
              Guardar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
