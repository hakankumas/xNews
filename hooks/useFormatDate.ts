// hooks/useFormatDate.ts

export function useFormatDate() {
    const formatDate = (date: string | Date) => {
        const newDate = new Date(date);

        const formattedDate = newDate.toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        const formattedTime = newDate.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${formattedDate} - ${formattedTime}`;
    };

    return { formatDate };
}
