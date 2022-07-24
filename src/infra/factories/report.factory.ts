import { ReportImpl } from "../../app/usecases/report"
import { EmailProtocol } from "../../domain/protocols/email.protocol"
import { NodemailerImpl } from "../adapters/email/nodemailer"
import { TemplateProtocol } from "../../app/usecases/report/template.protocol"
import { ReleaseRepository } from "../../app/usecases/report/release.repository"
import { TemplateReportPdfImpl } from "../adapters/report/template-report-pdf-adapter"
import { TemplateReportExcelImpl } from "../adapters/excel/template-report-excel-adapter"
import { ReleaseRepositoryPrismaImpl } from "../adapters/repositories/release-repository-impl"

export const ReportPdfAndExcelFactory = () => {
    const email: EmailProtocol = new NodemailerImpl()
    const repository: ReleaseRepository = new ReleaseRepositoryPrismaImpl()
    const pdf: TemplateProtocol = new TemplateReportPdfImpl()
    const excel: TemplateProtocol = new TemplateReportExcelImpl()
    return new ReportImpl(email, repository,[pdf, excel])
}
