class AuthRouter:
    auth_labels = ['auth', 'authentication', 'admin', 'authtoken']

    def db_for_read(self, model, **hints):
        print("READ is getting app_label: " + str(model._meta.app_label))
        if model._meta.app_label in self.auth_labels:
            return 'auth_db'
        elif model._meta.app_label == 'accounts':
            return 'account_information'
        return None

    def db_for_write(self, model, **hints):
        print("WRITE is getting app_label: " + str(model._meta.app_label))
        if model._meta.app_label in self.auth_labels:
            return 'auth_db'
        elif model._meta.app_label == 'accounts':
            return 'account_information'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        print("MIGRATE is getting app_label: " + str(app_label))
        print(app_label)
        if app_label in self.auth_labels:
            return db == 'auth_db'
        elif app_label == 'accounts':
            return 'account_information'
        return None
