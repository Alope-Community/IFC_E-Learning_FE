const timestampFormatter = (dateStr: string) => {
  const date = new Date(dateStr);

  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const formattedDate = `${hari[date.getDay()]}, ${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${bulan[date.getMonth()]} ${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return formattedDate;
};

export default timestampFormatter;
