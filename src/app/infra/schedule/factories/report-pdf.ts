import { ReportPdf } from "../../../domain/usecases/report/pdf"
import { EmailAdapter } from "../../adapters/email-adapter"
import { TemplateReportPdfAdapter } from "../../adapters/report/template-report-pdf-adapter"
import { ReleaseRepositoryAdapter } from "../../repositories/release-repository-adapter"
import { UserRepositoryAdapter } from "../../repositories/user-repository-adapter"

export const getReportPdfInstance = () => {
    return new ReportPdf(
        new EmailAdapter(),
        new UserRepositoryAdapter(),
        new ReleaseRepositoryAdapter(),
        new TemplateReportPdfAdapter()
    )
}