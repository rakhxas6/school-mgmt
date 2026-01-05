import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../services/supabaseClient";
import { useEffect, useState } from "react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  class: yup.string().required("Class is required"),
});

const StudentForm = ({ onSuccess, editStudent, clearEdit }) => {
  const [classes, setClasses] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      class: "",
    },
  });

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase.from("classes").select("name");
      if (!error) setClasses(data.map((c) => c.name)); // extract names
    };
    fetchClasses();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (editStudent) {
      setValue("name", editStudent.name);
      setValue("email", editStudent.email);
      setValue("class", editStudent.class);
    } else {
      reset();
    }
  }, [editStudent, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (editStudent?.id) {
        // EDIT
        const { error } = await supabase
          .from("students")
          .update(data)
          .eq("id", editStudent.id);

        if (error) throw error;
      } else {
        // ADD
        const { error } = await supabase.from("students").insert([data]);
        if (error) throw error;
      }

      reset();
      if (clearEdit) clearEdit();
      onSuccess();
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to save student. Please try again.");
    }
  };

  const handleCancel = () => {
    reset();
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          placeholder="Enter student name"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Enter student email"
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
  <select
    {...register("class")}
    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 appearance-none cursor-pointer"
  >
    <option value="" disabled>
      Select Class
    </option>
    {classes.map((c) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </select>
  {errors.class && (
    <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
  )}
</div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Saving..."
            : editStudent
            ? "Update Student"
            : "Add Student"}
        </button>

        {editStudent && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-medium transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
