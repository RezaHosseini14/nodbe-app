import { Modal } from "rsuite";
import { useState } from "react";

function LightBox({ children }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleOpenModal}>
        {children}
      </div>
      <Modal open={showModal} backdrop={true} onClose={handleCloseModal} size="xs">
        <Modal.Header>
          <Modal.Title>اطلاعیه مراسم بعدی</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white rounded-xl overflow-hidden aspect-[1/1.41] mb-4 w-full z-10 relative">
            {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LightBox;
