export abstract class BaseMapper<Domain, Model> {
  abstract entityToModel(domain: Domain): Model;
  abstract modelToEntity(model: Model): Domain;
}
