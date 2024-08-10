export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
}

export function monthNumberToPtName(
  month: number | string,
  shorten: boolean = true
): string {
  month = parseInt(month.toString());
  switch (month) {
    case 1:
      return shorten ? 'Jan' : 'Janeiro';
    case 2:
      return shorten ? 'Fev' : 'Feveiro';
    case 3:
      return shorten ? 'Mar' : 'Março';
    case 4:
      return shorten ? 'Abr' : 'Abril';
    case 5:
      return shorten ? 'Mai' : 'Maio';
    case 6:
      return shorten ? 'Jun' : 'Junho';
    case 7:
      return shorten ? 'Jul' : 'Julho';
    case 8:
      return shorten ? 'Ago' : 'Agosto';
    case 9:
      return shorten ? 'Set' : 'Setembro';
    case 10:
      return shorten ? 'Out' : 'Outubro';
    case 11:
      return shorten ? 'Nov' : 'Novembro';
    case 12:
      return shorten ? 'Dez' : 'Dezembro';

    default:
      return '';
  }
}
