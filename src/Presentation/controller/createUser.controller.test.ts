// Import the CreateUserUC class
import { CreateUserUC } from "../../Application/createUser.usecase";
import { ZodSchema } from "zod";
import { Request, Response } from "express";
import { User } from "../../domain/User";

// Mock the dependencies
const mockSchemaValidation = {
  parse: jest.fn(),
};

// Define a mock IUserRepo object
const mockUserRepo: IUserRepo = {
  async save(user: User): Promise<boolean> {
    return true; // Mock implementation always returns true
  },
};

// Mock the execute method of CreateUserUC as a Jest mock function
const mockExecute = jest.fn().mockResolvedValueOnce({
  userID: "user-id",
  name: "Budi setyawan",
  phone: "08111729080",
  email: "Dilapanga1@gmail.com",
});

// Create an instance of CreateUserUC with the mocked execute method
const createUserUC = new CreateUserUC(mockUserRepo);
createUserUC.execute = mockExecute;

// Import the CreateUserController class after mocking CreateUserUC
import { CreateUserController } from "./createUser.controller";
import { IUserRepo } from "../../Application/IUserRepo";

// Create an instance of the controller with mocked dependencies
const controller = new CreateUserController(
  createUserUC,
  mockSchemaValidation as unknown as ZodSchema
);

describe("CreateUserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle a valid request", async () => {
    const req = {
      body: {
        name: "Budi setyawan",
        phone: "08111729080",
        email: "Dilapanga1@gmail.com",
        password: "ASD12345",
        consfirmPassword: "ASD12345",
      },
    } as Request;
    const res = {} as Response;

    // Mock the behavior of dependencies
    mockSchemaValidation.parse.mockReturnValueOnce(req.body);

    // Call the handle method
    const result = await controller.handle(req, res);

    // Assert the result
    expect(result).toEqual({
      data: {
        userID: "user-id",
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      },
    });

    // Assert that dependencies were called with the correct arguments
    expect(mockSchemaValidation.parse).toHaveBeenCalledWith(req.body);
    expect(mockExecute).toHaveBeenCalledWith({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      consfirmPassword: req.body.consfirmPassword,
    });
  });
});
