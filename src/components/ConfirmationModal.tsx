import type React from "react"
import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material"
import "../styles/confirmation-modal.scss"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Sim",
  cancelText = "Não",
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="confirmation-modal" maxWidth="xs" fullWidth>
      <DialogContent className="modal-content">
        <Typography variant="h6" className="modal-title">
          {title}
        </Typography>
        <Typography variant="body1" className="modal-message">
          {message}
        </Typography>
        <Box className="modal-actions">
          <Button variant="outlined" onClick={onClose} className="cancel-button">
            {cancelText}
          </Button>
          <Button variant="contained" onClick={onConfirm} className="confirm-button">
            {confirmText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal