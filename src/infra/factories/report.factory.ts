import { ReportImpl } from "../../app/usecases/report"
import { EmailFileProtocol } from "../../domain/protocols/email.protocol"
import { NodemailerImpl } from "../adapters/email/nodemailer"
import { TemplateFileProtocol } from "../../app/usecases/report/template.protocol"
import { ReportRepository } from "../../app/usecases/report/repository"
import { TemplateReportPdfImpl } from "../adapters/templates/report-pdf-adapter.template"
import { TemplateReportExcelImpl } from "../adapters/templates/report-excel-adapter.template"
import { ReportRepositoryPrismaImpl } from "../adapters/repositories/report-repository-impl"
import { FileProtocol } from "../../domain/protocols/file.protocol"
import { FileService } from "../adapters/file/filesystem"

export const ReportPdfAndExcelFactory = () => {
    const email: EmailFileProtocol = new NodemailerImpl()
    const repository: ReportRepository = new ReportRepositoryPrismaImpl()
    const pdf: TemplateFileProtocol = new TemplateReportPdfImpl()
    const file: FileProtocol = new FileService()
    const excel: TemplateFileProtocol = new TemplateReportExcelImpl(file)
    return new ReportImpl(email, repository,[pdf, excel])
}
