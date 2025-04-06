import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserForm from "../components/UserForm";
import { useCreateUser } from "../hooks/useCreateUser";
import type { UserFormData } from "../schemas/userSchema";

const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser, isLoading } = useCreateUser();

  const handleSubmit = (data: UserFormData) => {
    const { confirmPassword, ...userData } = data;
    createUser(userData);
  };

  const handleCancel = () => {
    toast.warning("Cadastro cancelado", {
      icon: false,
      style: {
        background: "#FF7700",
        color: "#FFFFFF",
      },
    });
    navigate("/usuarios");
  };

  return (
    <UserForm
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      title="Cadastro de Usuário"
      submitButtonText="Cadastrar"
    />
  );
};

export default CreateUser;
