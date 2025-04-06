import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationModal from "./ConfirmationModal";
import { userFormSchema, type UserFormData } from "../schemas/userSchema";
import "../styles/user-form.scss";
import { ArrowBack } from "../assets/icons/ArrowBack";

interface UserFormProps {
  defaultValues?: Partial<UserFormData>;
  isLoading: boolean;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  title: string;
  submitButtonText: string;
}

const UserForm = ({
  defaultValues,
  isLoading,
  onSubmit,
  onCancel,
  title,
  submitButtonText,
}: UserFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      matricula: "",
      password: "",
      confirmPassword: "",
      ...defaultValues,
    },
  });

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true);
    } else {
      onCancel();
    }
  };

  const confirmCancel = () => {
    setIsCancelModalOpen(false);
    onCancel();
  };

  return (
    <div className="user-form-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/usuarios" className="breadcrumb-item">
          Usuários
        </Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-item">{title}</span>
      </div>

      <Box className="page-header">
        <Link to="/usuarios" className="back-link">
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h4" component="h1" className="page-title">
          {title}
        </Typography>
      </Box>

      <Paper elevation={0} className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-section">
            <div className="section-header">
              <Typography variant="subtitle1" className="section-title">
                Dados do Usuário
              </Typography>
              <div className="section-line"></div>
            </div>

            <Box className="form-row">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div className="form-field">
                    <TextField
                      {...field}
                      label="Nome Completo"
                      placeholder="Insira o nome completo*"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      className="form-input"
                      InputProps={{
                       
                      }}
                    />
                    <div className="char-limit">• Máx. 30 Caracteres</div>
                  </div>
                )}
              />

              <Controller
                name="matricula"
                control={control}
                render={({ field }) => (
                  <div className="form-field">
                    <TextField
                      {...field}
                      label="Matrícula"
                      placeholder="Insira o Nº da matrícula"
                      variant="outlined"
                      fullWidth
                      error={!!errors.matricula}
                      helperText={errors.matricula?.message}
                      className="form-input"
                      InputProps={{
                       
                      }}
                    />
                    <div className="char-limit">• Apenas números</div>
                  </div>
                )}
              />
            </Box>

            <Box className="form-row">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="form-field">
                    <TextField
                      {...field}
                      label="E-mail"
                      placeholder="Insira o E-mail*"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      className="form-input"
                      
                    />
                    <div className="char-limit">• Máx. 40 Caracteres</div>
                  </div>
                )}
              />

              <div className="form-field" />
            </Box>
          </Box>

          <Box className="form-section">
            <div className="section-header">
              <Typography variant="subtitle1" className="section-title">
                Dados de acesso
              </Typography>
              <div className="section-line"></div>
            </div>

            <Box className="form-row">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="form-field">
                    <TextField
                      {...field}
                      label="Senha"
                      placeholder="Senha"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      className="form-input"
                      InputProps={{
                       
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className="char-limit">• Min. 6 Caracteres</div>
                  </div>
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className="form-field">
                    <TextField
                      {...field}
                      label="Repetir Senha"
                      placeholder="Repetir Senha"
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      className="form-input"
                      InputProps={{
                       
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                )}
              />
            </Box>
          </Box>

          <Box className="form-actions">
            <Button
              variant="outlined"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isLoading}
              className="save-button"
            >
              {isLoading ? <CircularProgress size={24} /> : submitButtonText}
            </Button>
          </Box>
        </form>
      </Paper>

      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancel}
        title="Deseja cancelar?"
        message="Os dados inseridos não serão salvos"
        confirmText="Sim"
        cancelText="Não"
      />
    </div>
  );
};

export default UserForm;
