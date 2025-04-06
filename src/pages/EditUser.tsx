import { useNavigate, useParams } from "react-router-dom"
import { CircularProgress, Box, Alert, Button } from "@mui/material"
import UserForm from "../components/UserForm"
import { useEditUser } from "../hooks/useEditUser"
import type { UserFormData } from "../schemas/userSchema"

const EditUser = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, updateUser, isLoading, isReady, isError, error } = useEditUser(id)

  const handleSubmit = (data: UserFormData) => {
    const { confirmPassword, ...updateData } = data
    const dataToUpdate = updateData.password
      ? updateData
      : {
          name: updateData.name,
          email: updateData.email,
          matricula: updateData.matricula,
        }

    updateUser(dataToUpdate)
  }

  const handleCancel = () => {
    navigate("/usuarios")
  }

  if (isLoading && !isReady) {
    return (
      <Box className="loading-container">
        <CircularProgress size={40} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box className="error-container">
        <Alert severity="error">{error instanceof Error ? error.message : "Erro ao carregar dados do usuário"}</Alert>
        <Button variant="outlined" onClick={() => navigate("/usuarios")} sx={{ mt: 2 }}>
          Voltar para lista de usuários
        </Button>
      </Box>
    )
  }

  const defaultValues = user
    ? {
        name: user.name,
        email: user.email,
        matricula: user.matricula,
        password: "",
        confirmPassword: "",
      }
    : undefined

  return (
    <UserForm
      defaultValues={defaultValues}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      title="Editar Usuário"
      submitButtonText="Salvar"
    />
  )
}

export default EditUser

