const headCellsDocumentSubject = [
	{
		id: "subject_name",
		numeric: false,
		label: "Nome do Assunto",
	},

	{
		id: "temporality",
		numeric: true,
		label: "Temporalidade",
	},
];

const headCellsBoxAbbreviation = [
	{
		id: "number",
		numeric: true,
		label: "Número",
	},

	{
		id: "abbreviation",
		numeric: false,
		label: "Abreviação",
	},

	{
		id: "name",
		numeric: false,
		label: "Nome",
	},

	{
		id: "year",
		numeric: true,
		label: "Ano",
	},
];

const headCellsPublicWorker = [
	{
		id: "name",
		numeric: false,
		label: "Nome",
	},

	{
		id: "cpf",
		numeric: false,
		label: "CPF",
	},

	{
		id: "office",
		numeric: false,
		label: "Cargo",
	},

	{
		id: "class_worker",
		numeric: false,
		label: "Classe",
	},

	{
		id: "capacity",
		numeric: false,
		label: "Lotação",
	},

	{
		id: "county",
		numeric: false,
		label: "Município",
	},
];

const headCellsUnity = [
	{
		id: "name_of_unity",
		numeric: false,
		label: "Nome da Unidade",
	},

	{
		id: "unity_abbreviation",
		numeric: false,
		label: "Sigla da Unidade",
	},

	{
		id: "administrative_bond",
		numeric: false,
		label: "Vínculo Administrativo",
	},

	{
		id: "bond_abbreviation",
		numeric: false,
		label: "Sigla do Vínculo",
	},

	{
		id: "type_of_unity",
		numeric: false,
		label: "Tipo de Unidade",
	},

	{
		id: "municipality",
		numeric: false,
		label: "Município",
	},

	{
		id: "telephone_number",
		numeric: true,
		label: "Telefone",
	},

	{
		id: "note",
		numeric: false,
		label: "Observações",
	},
];

const headCellsDocumentType = [
	{
		id: "document_name",
		numeric: false,
		label: "Nome do Documento",
	},

	{
		id: "temporality",
		numeric: true,
		label: "Temporalidade",
	},
];

const headCellsShelf = [
	{
		id: "number",
		numeric: true,
		label: "Estante",
	},

	{
		id: "number",
		numeric: true,
		label: "Prateleira",
	},
];

const headCellsStatus = [
	{
		id: "filed",
		numeric: false,
		label: "Arquivado",
	},

	{
		id: "unity_that_forwarded",
		numeric: false,
		label: "Unidade que encaminhou",
	},

	{
		id: "document_requested",
		numeric: false,
		label: "Documento solicitado",
	},

	{
		id: "send_date",
		numeric: true,
		label: "Data de envio",
	},
];

const tableHeadCells = (url) => {
	let headCells = [];

	if (url === "document_subject/") {
		headCells = headCellsDocumentSubject;
	} else if (url === "box_abbreviation/") {
		headCells = headCellsBoxAbbreviation;
	} else if (url === "public_worker/") {
		headCells = headCellsPublicWorker;
	} else if (url === "unity/") {
		headCells = headCellsUnity;
	} else if (url === "document_type/") {
		headCells = headCellsDocumentType;
	} else if (url === "shelf/") {
		headCells = headCellsShelf;
	} else if (url === "status/") {
		headCells = headCellsStatus;
	}
	return headCells;
};

export default tableHeadCells;
