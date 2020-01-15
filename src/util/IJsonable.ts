export interface IJsonable {
    toJson: () => any
    toJsonString: () => string
}