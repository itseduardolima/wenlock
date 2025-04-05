import { Drawer, IconButton, Typography, Box, Button, CircularProgress, Alert } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import type { User } from "../interface/user.interface"
import "../styles/user-details-drawer.scss"

interface UserDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  user: User | null | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A"

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Data inválida"
  }
}

const formatMatricula = (matricula: string | undefined): string => {
  if (!matricula) return "N/A"

  const cleanMatricula = matricula.replace(/\D/g, "")
  if (cleanMatricula.length <= 3) return cleanMatricula

  const firstPart = cleanMatricula.slice(0, 3)
  const secondPart = cleanMatricula.slice(3)
  return `${firstPart}.${secondPart}`
}

const UserDetailsDrawer = ({ isOpen, onClose, user, isLoading, isError, error }: UserDetailsDrawerProps) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} className="user-details-drawer">
      <Box className="drawer-container">
        <Box className="drawer-header">
          <Typography variant="h6" className="drawer-title">
            Visualizar Usuário
          </Typography>
          <IconButton aria-label="close" onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="drawer-content">
          {isLoading ? (
            <Box className="loading-container">
              <CircularProgress size={40} />
            </Box>
          ) : isError ? (
            <Box className="error-container">
              <Alert severity="error">Erro ao carregar dados do usuário</Alert>
              <Typography variant="body2" className="error-details">
                {error?.message || "Erro desconhecido"}
              </Typography>
            </Box>
          ) : user ? (
            <>
              <div className="section-header">
                <Typography variant="subtitle2" className="section-title">
                  Dados do Usuário
                </Typography>
                <div className="section-line"></div>
              </div>

              <Box className="user-info-row">
                <Box className="info-column">
                  <Typography variant="body2" className="field-label">
                    Nome
                  </Typography>
                  <Typography variant="body1" className="field-value">
                    {user.name}
                  </Typography>
                </Box>
                <Box className="info-column">
                  <Typography variant="body2" className="field-label">
                    Matrícula
                  </Typography>
                  <Typography variant="body1" className="field-value">
                    {formatMatricula(user.matricula)}
                  </Typography>
                </Box>
              </Box>

              <Box className="user-info-row">
                <Box className="info-column full-width">
                  <Typography variant="body2" className="field-label">
                    E-mail
                  </Typography>
                  <Typography variant="body1" className="field-value">
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <div className="section-header">
                <Typography variant="subtitle2" className="section-title">
                  Detalhes
                </Typography>
                <div className="section-line"></div>
              </div>

              <Box className="user-info-row">
                <Box className="info-column">
                  <Typography variant="body2" className="field-label">
                    Data de criação
                  </Typography>
                  <Typography variant="body1" className="field-value">
                    {formatDate(user.createdAt)}
                  </Typography>
                </Box>
                <Box className="info-column">
                  <Typography variant="body2" className="field-label">
                    Última edição
                  </Typography>
                  <Typography variant="body1" className="field-value">
                    {user.updatedAt && user.updatedAt !== user.createdAt ? formatDate(user.updatedAt) : "Nenhuma"}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Box className="empty-container">
              <Typography variant="body1">Nenhum usuário selecionado</Typography>
            </Box>
          )}
        </Box>

        <Box className="drawer-footer">
          <Button variant="outlined" onClick={onClose} className="close-button">
            Fechar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default UserDetailsDrawer