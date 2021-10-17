import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateDocumentSubject from "../../../pages/Fields/Create/CreateDocumentSubject";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { inputChange } from "./inputTest.test";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}document-subject/`;
const axiosProfile = process.env.REACT_APP_URL_API_PROFILE;

const server = setupServer(
	rest.post(`${axiosProfile}api/token/refresh/`, (req, res, ctx) => {
		if (req.body.refresh === localStorage.getItem("tkr")) {
			return res(ctx.status(200));
		} else {
			return res(ctx.status(404));
		}
	}),
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.subject_name === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();

describe("Page test", () => {
	it("axios sucess", async () => {
		render(<CreateDocumentSubject />);

		inputChange("Assunto do documento", "201");
		inputChange("Temporalidade", "2022-01-01");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});

	it("axios fail", async () => {
		render(<CreateDocumentSubject />);

		inputChange("Assunto do documento", "401");
		inputChange("Temporalidade", "2022-01-01");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
});