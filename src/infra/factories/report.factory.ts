import { ReportImpl } from "../../app/usecases/report"
import { EmailProtocol } from "../../domain/protocols/email.protocol"
import { NodemailerImpl } from "../adapters/email/nodemailer"
import { TemplateProtocol } from "../../app/usecases/report/template.protocol"
import { ReportRepository } from "../../app/usecases/report/repository"
import { TemplateReportPdfImpl } from "../adapters/report/template-report-pdf-adapter"
import { TemplateReportExcelImpl } from "../adapters/excel/template-report-excel-adapter"
import { ReportRepositoryPrismaImpl } from "../adapters/repositories/report-repository-impl"
import { FileProtocol } from "../../domain/protocols/file.protocol"
import { FileService } from "../adapters/file/filesystem"

export const ReportPdfAndExcelFactory = () => {
    const email: EmailProtocol = new NodemailerImpl()
    const repository: ReportRepository = new ReportRepositoryPrismaImpl()
    const pdf: TemplateProtocol = new TemplateReportPdfImpl()
    const file: FileProtocol = new FileService()
    const excel: TemplateProtocol = new TemplateReportExcelImpl(file)
    return new ReportImpl(email, repository,[pdf, excel])
}
