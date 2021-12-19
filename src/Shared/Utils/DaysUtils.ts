const dayToNumber = {
  sunday: 1,
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
}

const dayNumberToPt = {
  1: 'Domingo',
  2: 'Segunda',
  3: 'Terça',
  4: 'Quarta',
  5: 'Quinta',
  6: 'Sexta',
  7: 'Sábado',
}

const numberToDay = {
  1: 'sunday',
  2: 'monday',
  3: 'tuesday',
  4: 'wednesday',
  5: 'thursday',
  6: 'friday',
  7: 'saturday',
}

enum dayTranslation {
  sunday = 'Domingo',
  monday = 'Segunda',
  tuesday = 'Terça',
  wednesday = 'Quarta',
  thursday = 'Quinta',
  friday = 'Sexta',
  saturday = 'Sábado'
}

export default class DaysUtils {
  static TranslateToPt(day : keyof typeof dayTranslation) : string {
    return dayTranslation[day]
  }
}