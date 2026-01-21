export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

export class NotFoundError extends DomainError {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}
export class ValidationError extends DomainError {
  public readonly details: Record<string, string>;

  constructor(message: string, details: Record<string, string>) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

export class InvalidRequestError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequestError";
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ConflictError extends DomainError {
  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictError";
  }
}

export class InfrastructureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InfrastructureError";
  }
}

export class DatabaseError extends InfrastructureError {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ExternalServiceError extends InfrastructureError {
  constructor(message: string) {
    super(message);
    this.name = "ExternalServiceError";
  }
}
