import { observable, action, runInAction } from 'mobx';
import { deleteDocument } from '../../services/api/documents';

class DeleteDocumentStore {

    notificationsStore;
    documentsStore;

    @observable isVisible = false;
    @observable documentId = null;
    @observable isSubmitting = false;

    constructor(notificationsStore, documentsStore) {
        this.notificationsStore = notificationsStore;
        this.documentsStore = documentsStore;
    }

    @action.bound
    show(documentId) {
        this.isVisible = true;
        this.documentId = documentId;
    }

    @action.bound
    hide() {
        this.isVisible = false;
    }

    submit() {
        this.isSubmitting = true;
        deleteDocument(this.documentId)
            .then(() => {
                runInAction(() => {
                    this.documentsStore.removeDocument(this.documentId);
                    this.hide();
                });
            })
            .catch((error) => {
                runInAction(() => {
                    this.notificationsStore.addNotification('error', `Error: ${error}`);
                });
            })
            .then(() => {
                runInAction(() => {
                    this.isSubmitting = false;
                });
            });
    }
}

export default DeleteDocumentStore;
