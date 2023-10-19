from ..models import Type


class TypeHelper:

    @staticmethod
    def get_type_instance_by_name(type_name):
        return Type.objects.get(name=type_name)

    @staticmethod
    def get_type_qs_by_name(type_name):
        return Type.objects.filter(name=type_name)

    @staticmethod
    def get_type_instance_by_id(type_id):
        return Type.objects.get(id=type_id)

    @staticmethod
    def get_type_qs_by_id(type_id):
        return Type.objects.filter(id=type_id)
