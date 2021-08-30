import { Icon } from '@fluentui/react/lib/Icon';
import { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
    isShown,
    hide,
    modalContent,
    headerText,
}) => {
    const modal = (
        <ReactModal
            isOpen={isShown}
            contentLabel={headerText}
            overlayClassName={"modal-overlay"}
            className={"modal"}
            bodyOpenClassName={"not-scrolling"}
            ariaHideApp={false}
        >
            <div className="modal-header">
                <div className="modal-title">{headerText}</div>
                <div className="close-modal" onClick={hide}><Icon iconName="ChromeClose" /></div>
            </div>
            <div className="modal-content">
                {modalContent}
            </div>
        </ReactModal>
    );
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};