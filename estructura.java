
public class Appointment {
    private String id; // ID cita (clave para anónimos)
    private LocalDateTime dateTime; 
    private String userId; // ID cita si está registrado
}

public interface AppointmentRepository {
    Appointment save(Appointment appointment);
    List<Appointment> findByUserId(String userId);

}

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleAppointment(@RequestBody ScheduleRequest request) {

        //clave de 6 dígitos, es aleatoria
        String appointmentId = generateRandomId();

        Appointment appointment = new Appointment();
        appointment.setId(request.getUserId() != null ? request.getUserId() : appointmentId);
        appointment.setDateTime(request.getDateTime());
        appointment.setUserId(request.getUserId());

        appointmentRepository.save(appointment);

        return ResponseEntity.ok().build();
    }

    private String generateRandomId() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}

public class ScheduleRequest {
    private LocalDateTime dateTime;
    private String userId;

}
