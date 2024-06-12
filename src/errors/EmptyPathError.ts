/**
 * Erro gerado quando possui um caminho vazio.
 */
export class EmptyPathError extends Error {
	constructor() {
		super("O path informado não pode ser uma string vazia.");
		this.name = "EmptyPathError";
	}
}
