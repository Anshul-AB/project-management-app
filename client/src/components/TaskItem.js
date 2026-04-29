export default function TaskItem({ item, onToggle }) {
  return (
    <View>
      <Text>{item.title}</Text>
      <Button
        title={item.status ? "Done" : "Pending"}
        onPress={() => onToggle(item.id)}
      />
    </View>
  );
}