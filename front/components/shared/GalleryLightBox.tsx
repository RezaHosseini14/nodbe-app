import React from "react";
import { Modal, Button } from "rsuite";
import { useState } from "react";

function GalleryLightBox({ children, images }) {
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
      <Modal open={showModal} backdrop={true} onClose={handleCloseModal} size="lg">
        <Modal.Header>
          <Modal.Title>اطلاعیه مراسم بعدی</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white rounded-xl overflow-hidden mb-4 w-full z-10 relative">
            {children}
            <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden w-full">
              {images?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl bg-black w-full overflow-hidden aspect-square"
                >
                  <img
                    className="object-cover w-full h-full"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                    alt="img"
                  />
                  {/* <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                    alt="asf"
                    layout="fill"
                    objectFit="cover"
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GalleryLightBox;
