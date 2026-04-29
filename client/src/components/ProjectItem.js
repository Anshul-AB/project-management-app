export default function ProjectItem({ item, onDelete, onOpen }) {
  return (
    <View>
      <Text onPress={() => onOpen(item)}>{item.title}</Text>
      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );
}