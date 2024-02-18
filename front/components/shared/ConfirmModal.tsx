import { Modal, Button } from "rsuite";

function ConfirmModal({
  message,
  open,
  apiFunc,
  handleClose,
  id,
}: {
  message: string;
  open: boolean;
  apiFunc: any;
  handleClose: any;
  id: string;
}) {
  return (
    <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
      <Modal.Body className="font-bold text-2xl text-center">{message}</Modal.Body>
      <Modal.Footer>
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => {
              apiFunc(id);
              handleClose();
            }}
            className="bg-green-500 hover:bg-green-700 transition rounded-lg flex-1 py-2 text-white"
          >
            تایید
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-700 transition rounded-lg flex-1 py-2 text-white"
          >
            لغو
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
