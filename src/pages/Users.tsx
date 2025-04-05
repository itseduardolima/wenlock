import type React from "react";
import { useState, useEffect } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from "@mui/icons-material";
import "../styles/users.scss";
import type { User } from "../interface/user.interface";
import { mockUsers } from "../mock/users";
import { ViewIcon } from "../assets/icons/ViewIcon";
import { PenIcon } from "../assets/icons/PenIcon";
import { TrashIcon } from "../assets/icons/TrashIcon";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const [showMockData, setShowMockData] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    if (showMockData) {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } else {
      setUsers([]);
      setFilteredUsers([]);
    }
  }, [showMockData]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="add-button"
        >
          Cadastrar Usuário
        </Button>
      </div>

      <Paper elevation={0} className="users-table-container">
        {users.length === 0 ? (
          <div className="empty-state">
            <Typography variant="h6" className="empty-title">
              Nenhum Usuário Registrado
            </Typography>
            <Typography variant="body2" className="empty-subtitle">
              Clique em "Cadastrar Usuário" para começar a cadastrar.
            </Typography>
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#0B2B25" }}>Nome</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {paginatedUsers.map((user) => (
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
                      >
                        <ViewIcon
                          isHovered={hoveredButton === `view-${user.id}`}
                        />
                      </div>
                      <div
                        className="action-button edit-button"
                        onMouseEnter={() => setHoveredButton(`edit-${user.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <PenIcon
                          isHovered={hoveredButton === `edit-${user.id}`}
                        />
                      </div>
                      <div
                        className="action-button delete-button"
                        onMouseEnter={() =>
                          setHoveredButton(`delete-${user.id}`)
                        }
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <TrashIcon
                          isHovered={hoveredButton === `delete-${user.id}`}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div className="pagination-container">
          <div className="total-items">
            Total de itens: <span>{filteredUsers.length}</span>
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

            <div className="pagination-button current-page">{page}</div>

            <IconButton
              onClick={handleNextPage}
              disabled={page === totalPages || totalPages === 0}
              className={`pagination-button ${
                page === totalPages || totalPages === 0 ? "disabled" : ""
              }`}
            >
              <KeyboardArrowRightIcon />
            </IconButton>

            <IconButton
              onClick={handleLastPage}
              disabled={page === totalPages || totalPages === 0}
              className={`pagination-button ${
                page === totalPages || totalPages === 0 ? "disabled" : ""
              }`}
            >
              <LastPageIcon />
            </IconButton>

            <div className="page-info">de {totalPages}</div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Users;
