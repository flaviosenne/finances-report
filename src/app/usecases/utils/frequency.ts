import { ReleaseModel } from "../../../domain/models/release"
import { ReleaseType } from "../../../domain/models/release-type"

export enum TypeFrequency {
    CATEGORY,
    EXPENSE,
    RECEP
}


export function getFrequency(releases: ReleaseModel[], type: TypeFrequency) {

    return new Promise((resolve, reject) => {
        const datas = {
            label: [],
            frequency: [],
            colors: [],
            values: []
        }

        let cont

        if (TypeFrequency.CATEGORY == type) {
            releases.forEach(release => {
                datas.label.push(release.category.description)
                datas.values.push(release.value)
            })
        } else {

            let releaseFiltered = []
            
            if (TypeFrequency.EXPENSE == type) {
                releaseFiltered = releases.filter(release => release.type == ReleaseType.EXPENSE)
            }
            
            if (TypeFrequency.RECEP == type) {
                releaseFiltered = releases.filter(release => release.type == ReleaseType.RECEP)
            }

            releaseFiltered.forEach(release => {
                datas.label.push(
                    new Intl.DateTimeFormat('pt-BR', { month: 'long' })
                        .format(release.createdAt))
                datas.values.push(release.value)

            })

        }

        let aux = 0
        for (let i = 0; i < datas.label.length; i++) {
            cont = datas.values[i + aux]
            for (let j = i; j < datas.label.length; j++) {
                while (datas.label[i] === datas.label[j + 1]) {
                    cont = (parseFloat(cont) + parseFloat(datas.values[j + aux + 1])).toFixed(2)
                    datas.label.splice(j, 1);
                    aux++
                }
            }
            datas.frequency[i] = cont
            const red = 0 + Math.floor((255 - 0) * Math.random());
            const green = 0 + Math.floor((255 - 0) * Math.random());
            const blue = 0 + Math.floor((255 - 0) * Math.random());
            datas.colors.push(`rgb(${red}, ${green}, ${blue})`)
        }
        resolve(datas)
    })

}
