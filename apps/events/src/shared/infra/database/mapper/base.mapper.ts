export abstract class BaseMapper<Domain = any, Model = any> {
  abstract entityToModel(domain: Domain): Model;
  abstract modelToEntity(model: Model): Domain;
}
