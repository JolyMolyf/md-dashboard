import mdSimulatorApi from "@/api/mdSimulatorApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useMdSimulator = () => {
    const queryClient = useQueryClient();

    const statusSimulator = useQuery({
        queryKey: ['md-simulator-status'],
        queryFn: mdSimulatorApi.status,
    });

    const startSimulator = useMutation({
        mutationFn: mdSimulatorApi.start,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['md-simulator-status'] });
        },
        onError: (error) => {
            console.error("Error starting MD simulator", error);
        }
    });

    const stopSimulator = useMutation({
        mutationFn: mdSimulatorApi.stop,
        onSuccess: (data) => {
            console.log("Stop response:", data);
            queryClient.invalidateQueries({ queryKey: ['md-simulator-status'] });
        },
        onError: (error) => {
            console.error("Error stopping MD simulator", error);
        }
    });

    return { startSimulator, stopSimulator, statusSimulator };
}

export default useMdSimulator;