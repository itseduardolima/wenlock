import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Typography,
  Paper,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from "@mui/icons-material"
import "../styles/users.scss"
import { ViewIcon } from "../assets/icons/ViewIcon"
import { PenIcon } from "../assets/icons/PenIcon"
import { TrashIcon } from "../assets/icons/TrashIcon"
import { useUsers } from "../hooks/useUsers"
import { useUserDetails } from "../hooks/useUserDetails"
import { useDeleteUser } from "../hooks/useDeleteUser"
import UserDetailsDrawer from "../components/UserDetailsDrawer"
import ConfirmationModal from "../components/ConfirmationModal"
import NotFound from "../assets/images/notfound-img.svg"

const Users = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 15
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  // Hook para gerenciar os detalhes do usuário
  const {
    user,
    isOpen,
    isLoading: isLoadingUserDetails,
    isError: isErrorUserDetails,
    error: errorUserDetails,
    openUserDetails,
    closeUserDetails,
  } = useUserDetails()

  // Hook para gerenciar a exclusão de usuário
  const { isDeleteModalOpen, openDeleteModal, closeDeleteModal, confirmDelete } = useDeleteUser()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useUsers({
    page,
    limit: itemsPerPage,
    search: debouncedSearch,
  })

  const users = usersData?.items || []
  const totalItems = usersData?.meta?.totalItems || 0
  const totalPages = usersData?.meta?.totalPages || 0
  const currentPage = usersData?.meta?.currentPage || 1

  useEffect(() => {
    if (usersData?.meta?.currentPage) {
      setPage(usersData.meta.currentPage)
    }
  }, [usersData?.meta?.currentPage])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
  }

  const handleFirstPage = () => {
    setPage(1)
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handleLastPage = () => {
    setPage(totalPages)
  }

  const handleViewUser = (userId: string) => {
    openUserDetails(userId)
  }

  const handleAddUser = () => {
    navigate("/usuarios/cadastro")
  }

  const handleDeleteUser = (userId: string) => {
    openDeleteModal(userId)
  }

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <div className="loading-state">
          <CircularProgress size={40} />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="error-state">
          <Alert severity="error">Erro ao carregar usuários. Por favor, tente novamente.</Alert>
          <Typography variant="body2" className="error-details">
            {error instanceof Error ? error.message : "Erro desconhecido"}
          </Typography>
        </div>
      )
    }

    if (users.length === 0) {
      return (
        <div className="empty-state">
          {searchTerm ? (
            <img src={NotFound} alt="Notfound image" className="notfound-image" />
          ) : (
            ""
          )}
          <Typography variant="h6" className="empty-title">
            {searchTerm ? "Nenhum Resultado Encontrado" : "Nenhum Usuário Registrado"}
          </Typography>
          <Typography variant="body2" className="empty-subtitle">
            {searchTerm
              ? "Não foi possível achar nenhum resultado para sua busca. Tente refazer a pesquisa para encontrar o que busca."
              : "Clique em 'Cadastrar Usuário' para começar a cadastrar."}
          </Typography>
        </div>
      )
    }

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#0B2B25" }}>Nome</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  position: "relative",
                  top: 10,
                }}
              >
                <TableCell>{user.name}</TableCell>

                <TableCell align="right" className="action-buttons">
                  <div
                    className="action-button view-button"
                    onMouseEnter={() => setHoveredButton(`view-${user.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => handleViewUser(user.id)}
                  >
                    <ViewIcon isHovered={hoveredButton === `view-${user.id}`} />
                  </div>
                  <div
                    className="action-button edit-button"
                    onMouseEnter={() => setHoveredButton(`edit-${user.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <PenIcon isHovered={hoveredButton === `edit-${user.id}`} />
                  </div>
                  <div
                    className="action-button delete-button"
                    onMouseEnter={() => setHoveredButton(`delete-${user.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <TrashIcon isHovered={hoveredButton === `delete-${user.id}`} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <Typography variant="h4" component="h1" className="page-title">
          Usuários
        </Typography>
      </div>

      <div className="users-actions">
        <TextField
          placeholder="Pesquisa"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm !== "" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                  className="clear-button"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" startIcon={<AddIcon />} className="add-button" onClick={handleAddUser}>
          Cadastrar Usuário
        </Button>
      </div>

      <Paper elevation={0} className="users-table-container">
        {renderTableContent()}

        <div className="pagination-container">
          <div className="total-items">
            Total de itens: <span>{totalItems}</span>
          </div>

          <div className="pagination-controls">
            <div className="items-per-page">
              Itens por página <span>{itemsPerPage}</span>
            </div>
            <IconButton
              onClick={handleFirstPage}
              disabled={page === 1}
              className={`pagination-button ${page === 1 ? "disabled" : ""}`}
            >
              <FirstPageIcon />
            </IconButton>

            <IconButton
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`pagination-button ${page === 1 ? "disabled" : ""}`}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>

            <div className="pagination-button current-page">{currentPage}</div>

            <IconButton
              onClick={handleNextPage}
              disabled={page === totalPages || totalPages === 0}
              className={`pagination-button ${page === totalPages || totalPages === 0 ? "disabled" : ""}`}
            >
              <KeyboardArrowRightIcon />
            </IconButton>

            <IconButton
              onClick={handleLastPage}
              disabled={page === totalPages || totalPages === 0}
              className={`pagination-button ${page === totalPages || totalPages === 0 ? "disabled" : ""}`}
            >
              <LastPageIcon />
            </IconButton>

            <div className="page-info">de {totalPages}</div>
          </div>
        </div>
      </Paper>

      <UserDetailsDrawer
        isOpen={isOpen}
        onClose={closeUserDetails}
        user={user}
        isLoading={isLoadingUserDetails}
        isError={isErrorUserDetails}
        error={errorUserDetails as Error}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Deseja excluir?"
        message="O usuário será excluído."
      />
    </div>
  )
}

export default Users