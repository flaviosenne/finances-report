import { ReportPdf } from "../../../domain/usecases/report/pdf"
import { EmailAdapter } from "../../adapters/email-adapter"
import { TemplateReportPdfAdapter } from "../../adapters/report/template-report-pdf-adapter"

export const getReportPdfInstance = () => {
    return new ReportPdf(new EmailAdapter(), new TemplateReportPdfAdapter())
}